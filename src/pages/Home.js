// Import component Bootsrap React
import { Card, Container, Row, Col, Button } from "react-bootstrap";

function Home() {
    // return dengan JSX Syntax
    return (
        /**
            INFORMASI PENTING ! : di dalam JSX, untuk menuliskan attribute class di dalam HTML diganti menjadi className.
        */
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                            <h1>Express.js dan React.js</h1>
                            <p className="lead">Tutorial FullStack Express.js dan React.js</p>

                            <Button href="http://botsaham.com" target="_blank" variant="primary" size="lg">Selengkapnya</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;