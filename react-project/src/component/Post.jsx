import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'

const Post = (props) => {
  return (
    <Card style={{margin: '10px', width: "550px"}}>
        <CardHeader><a style={{textDecoration: "none"}} href={`/user/${props.user.id}`}>{props.user.name} - @{props.user.username}</a></CardHeader>
        <CardBody>
            <CardText>{props.content}</CardText>
        </CardBody>
        <CardFooter>
            {props.date}
        </CardFooter>
    </Card>
  )
}

export default Post