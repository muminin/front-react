// import hook useState dan useEffect from react
import { useState, useEffect } from "react";

// import component bootstrap react
import { Card, Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

// import axios
import axios from "axios";

/**
    Untuk hook useNavigate akan kita gunakan untuk melakukan navigasi ke URL lain.
    Sedangkan untuk useParams akan digunakan untuk mengambil nilai parameter yang ada di URL browser.
*/
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    // inisialisasi dengan parameter di API
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // inisialisasi validator
    const [validation, setValidation] = useState({});

    // navigasi untuk kebutuhan direct/redirect
    const navigate = useNavigate();

    // GET ID dari parameter URL
    const { id } = useParams();

    // Hook useEffect
    useEffect(() => {
        // panggil fungsi getPostById
        // getPostById();

        axios.get(`http://localhost:3001/api/post/${id}`)
            .then((res) => {
                const data = res.data.data;

                setTitle(data.title);
                setContent(data.content);
            });
    }, [id]);

    // fungsi getPostById
    // const getPostById = async () => {
    //     // Get Data API
    //     const response = await axios.get(`http://localhost:3001/api/post/${id}`);

    //     // Get Response
    //     const data = await response.data.data;

    //     // Assign data ke parameter
    //     setTitle(data.title);
    //     setContent(data.content);
    // };

    // fungsi updatePost
    const updatePost = async (event) => {
        event.preventDefault();

        // Send data ke API
        await axios.patch(`http://localhost:3001/api/post/${id}`, {
            title: title,
            content: content,
        }).then(() => {
            // redirect
            navigate('/posts');
        }).catch((err) => {
            // assign validation to parameter
            setValidation(err.response.data);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            {
                                validation.errors &&
                                <Alert variant="danger">
                                    <ul className="mt-0 mb-0">
                                        {validation.errors.map((err, index) => (
                                            <li key={index}>{`${err.param} : ${err.msg}`}</li>
                                        ))}
                                    </ul>
                                </Alert>
                            }

                            <Form onSubmit={updatePost}>
                                <Form.Group className='mb-3' controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Masukkan Title" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formContent">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Masukkan Content" />
                                </Form.Group>

                                <Button variant='primary' type='submit'>
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditPost;