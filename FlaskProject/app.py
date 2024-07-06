from flask import Flask, request, jsonify
from functools import wraps
from passlib.hash import sha256_crypt
import psycopg2
import jwt
import datetime

app = Flask(__name__)


conn = psycopg2.connect(
    host="localhost",
    database="flaskreactdb",
    user="postgres",
    password="341526ByZx"
)

app.secret_key = "FlaskReactAppSecretKey"



class User:
    def __init__(self, id, name, username, email):
        self.id = id
        self.name = name
        self.username = username
        self.email = email

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def serialize_user(self):
        return {"id": self.id, "name": self.name, "username": self.username, "email": self.email}


class Post:
    def __init__(self, id, content, date, user):
        self.id = id
        self.content = content
        self.date = date
        self.user = user

    def serialize_post(self):
        return {"id": self.id, "content": self.content, "date": self.date, "user": self.user.serialize_user()}


def validate_name(name):
    return 3 <= len(name) <= 50


def validate_username(username):
    return 4 <= len(username) <= 25


def validate_email(email):
    return "@" in email

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token bulunamadı'}), 401
        try:
            data = jwt.decode(token, app.secret_key, algorithms=["HS256"])
            query = "SELECT * FROM users WHERE id=%s"
            cursor = conn.cursor()
            cursor.execute(query, (data['auth_user_id'],))
            auth_user = cursor.fetchone()
            auth_user_id = auth_user[0]
            cursor.close()
        except:
            return jsonify({"message": "Token geçersiz!"}), 401
        return f(auth_user_id, *args, **kwargs)
    return decorated


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data["name"]
    username = data["username"]
    email = data["email"]
    password = data["password"]
    confirm = data["confirm"]
    if validate_name(name) and validate_username(username) and validate_email(email) and password == confirm:
        query = "INSERT INTO users(name, username, email, password) VALUES (%s,%s,%s,%s)"
        cursor = conn.cursor()
        cursor.execute(query, (name, username, email, sha256_crypt.hash(password)))
        conn.commit()
        cursor.close()
        response = jsonify({"message": "Kayıt işlemi başarılı"})
        response.status_code = 200
        return response
    else:
        response = jsonify({"message": "Kayıt işlemi başarısız"})
        response.status_code = 400
        return response


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password_entered = data["password"]
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE username=%s"
    cursor.execute(query, (username,))
    user = cursor.fetchone()
    cursor.close()
    if user:
        real_password = user[4]
        if sha256_crypt.verify(password_entered, real_password):
            token = jwt.encode({'auth_user_id': user[0], 'exp': datetime.datetime.now() + datetime.timedelta(days=1.0)},
                               app.secret_key, algorithm="HS256")
            auth_user = User(user[0], user[1], user[2], user[3])
            response = jsonify({"token": token, "user": auth_user.serialize_user()})
            response.status_code = 200
            return response
        else:
            response = jsonify({"message": "Şifreler uyuşmadı"})
            response.status_code = 400
            return response
    else:
        response = jsonify({"message": "Kullanıcı bulunamadı"})
        response.status_code = 404
        return response


def get_user(id):
    cursor = conn.cursor()
    query = "SELECT * FROM users WHERE id=%s"
    cursor.execute(query, (id,))
    data = cursor.fetchone()
    cursor.close()
    if data:
        user_id = int(data[0])
        name = data[1]
        username = data[2]
        email = data[3]
        user = User(user_id, name, username, email)
        return user
    else:
        response = jsonify({"message": "Kullanıcı bulunamadı"})
        response.status_code = 404
        return response

@app.route("/user/<int:id>")
def get_user_details(id):
    user = get_user(id)
    if user:
        return jsonify(user.serialize_user()), 200
    else:
        return jsonify({"message": "Kullanıcı Bulunamadı"}), 404


@app.route("/post", methods=["POST"])
@token_required
def create_post(auth_user_id):
    data = request.json
    content = data["content"]
    date = datetime.date.today()
    query_for_post = "INSERT INTO post(content, date, user_id) VALUES (%s,%s,%s)"
    cursor = conn.cursor()
    cursor.execute(query_for_post, (content, date, auth_user_id))
    conn.commit()
    cursor.close()

    response = jsonify({"message": "Post başarıyla paylaşıldı"})
    response.status_code = 200
    return response


@app.route("/post")
def get_posts():
    cursor = conn.cursor()
    query = "SELECT * FROM post ORDER BY DATE DESC"
    cursor.execute(query)
    posts = cursor.fetchall()
    cursor.close()
    response = []
    if posts:
        for row in posts:
            post_id = row[0]
            content = row[1]
            date = row[2]
            user_id = row[3]
            user = get_user(int(user_id))
            post = Post(int(post_id), content, date, user)
            serialized_post = post.serialize_post()
            response.append(serialized_post)
        return jsonify(response), 200
    else:
        return jsonify(response), 404

@app.route("/post/user/<int:user_id>")
def get_posts_by_user(user_id):
    cursor = conn.cursor()
    query = "SELECT * FROM post, user WHERE post.user_id=%s ORDER BY DATE DESC"
    cursor.execute(query, (user_id,))
    posts = cursor.fetchall()
    cursor.close()
    response = []
    if posts:
        for row in posts:
            post_id = row[0]
            content = row[1]
            date = row[2]
            user_id = row[3]
            user = get_user(int(user_id))
            post = Post(int(post_id), content, date, user)
            serialized_post = post.serialize_post()
            response.append(serialized_post)
        return jsonify(response), 200
    else:
        return jsonify(response), 404


@app.route("/post/<int:id>")
def get_post(id):
    cursor = conn.cursor()
    query = "SELECT * FROM post WHERE id=%s"
    cursor.execute(query, (id,))
    post = cursor.fetchone()
    cursor.close()
    if post:
        post_id = int(post[0])
        content = post[1]
        date = post[2]
        user_id = post[3]
        user = get_user(user_id)
        post = Post(post_id, content, date, user)
        response = post.serialize_post()
        return jsonify(response), 200
    else:
        response = jsonify({"message": "Post bulunamadı"})
        response.status_code = 404
        return response


@app.route("/post/<int:id>", methods=["DELETE"])
@token_required
def delete_post(auth_user_id, id):
    cursor = conn.cursor()
    query1 = "SELECT * FROM post WHERE id=%s"
    cursor.execute(query1, (id,))
    data = cursor.fetchone()
    if data:
        user = get_user(auth_user_id)
        if user.id == auth_user_id:
            query2 = "DELETE FROM post WHERE id=%s"
            cursor.execute(query2, (id,))
            conn.commit()
            cursor.close()
            response = jsonify({"message": "Post başarıyla silindi"})
            response.status_code = 200
            return response
        else:
            response = jsonify({"message": "Bunu yapma yetkiniz yok"})
            response.status_code = 401
            return response
    else:
        response = jsonify({"message": "Böyle bir post yok"})
        response.status_code = 404
        return response

if __name__ == "__main__":
    app.run(debug=True)



