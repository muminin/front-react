// Import hook useState dan useEffect from react
import { useState, useEffect } from "react";

// Import react router dom
import { Link } from "react-router-dom";

// Import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from "react-bootstrap";

// Import Axios
import axios from "axios";

function PostIndex() {
    // define state
    const [posts, setPosts] = useState([]);

    // useEffect hook
    useEffect(() => {
        // panggil method "fetchData"
        fetchData();
    }, []);

    // function "fetchData"
    const fetchData = async () => {
        // fetching
        const response = await axios.get('http://localhost:3001/api/post');

        // get response data
        const data = await response.data.data;

        // assign response data to state "posts"
        setPosts(data);
    };

    // function deletePost
    const deletePost = async (id) => {
        // sending
        await axios.delete(`http://localhost:3001/api/post/${id}`);

        // panggil function fetchData
        fetchData();
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/posts/create" variant="success" className="mb-3">Tambah Post</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, index) =>
                                        <tr key={post.id}>
                                            <td>{index + 1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.content}</td>
                                            <td className="text-center">
                                                <Button as={Link} to={`/posts/edit/${post.id}`} variant="primary" size="sm" className="me-2">Edit</Button>
                                                <Button onClick={() => deletePost(post.id)} variant="danger" size="sm">Delete</Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PostIndex;