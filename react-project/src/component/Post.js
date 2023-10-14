import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardText } from 'reactstrap'

const Post = (props) => {
  return (
    <Card style={{margin: '10px'}}>
        <CardHeader>{props.user.name} - @{props.user.username}</CardHeader>
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