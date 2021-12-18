// import hook useState from react
import { useState } from 'react';

// import component bootstrap react
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// import axios
import axios from 'axios';

// import hook useNavigate untuk redirect
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    /**
        Untuk state title dan content akan digunakan untuk menyimpan data yang diketik di dalam input form.
        Dan sedangkan untuk state validation akan digunakan untuk menyimpan error response dari Rest API.
    */
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // state validation
    const [validation, setValidation] = useState({});

    // history
    const navigate = useNavigate();

    // method "storePost"
    const storePost = async (event) => {
        event.preventDefault();

        // send data to server
        await axios.post('http://localhost:3001/api/post', {
            title: title,
            content: content,
        }).then(() => {
            // redirect
            navigate('/posts');
        }).catch((err) => {
            // assign validation on state
            setValidation(err.response.data);
        });
    };

    return (
        <Container className='mt-3'>
            <Row>
                <Col md="{12}">
                    <Card className='border-0 rounded shadow-sm'>
                        <Card.Body>
                            {
                                validation.errors &&
                                <Alert variant="danger">
                                    <ul className="mt-0 mb-0">
                                        {validation.errors.map((error, index) => (
                                            <li key={index}>{`${error.param} : ${error.msg}`}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            }

                            <Form onSubmit={storePost}>
                                <Form.Group className='mb-3' controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Masukkan Title" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Masukkan Content" />
                                </Form.Group>

                                <Button variant='primary' type='submit'>
                                    Simpan
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;