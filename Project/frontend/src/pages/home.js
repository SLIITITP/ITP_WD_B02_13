import React from 'react'

import { Container, Row, Col } from 'reactstrap'




function home() {


    const Subtitle = ({ subtitle }) => {
        return (
            <h3 className='section_subtitle'>{subtitle}</h3>
        )
    }

    return (
        <>
            <section>
                <Container>
                    <Row>
                        <Col>
                            <div className="hero__content">
                                <div className="hero__subtitle d-flex align-items-center">
                                    <Subtitle subtitle={"Online T-shirt Design & printing Platform"} />

                                </div>
                                <h1>
                                    We design Your idea{" "}
                                    <span className="highlight">
                                        A Live
                                    </span>
                                </h1>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum veritatis
                                    adipisci odit quibusdam cupiditate cum architecto, debitis necessitatibus
                                    ab error voluptas mollitia repellat! Corrupti fuga similique, asperiores
                                    iure adipisci possimus.
                                </p>
                            </div>
                        </Col>

                        <Col lg='2'>
                            <div className="hero__img-box ">

                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-4">

                            </div>
                        </Col>
                        <Col lg='2'>
                            <div className="hero__img-box mt-5">

                            </div>
                        </Col>

                    </Row>
                </Container>
            </section>
        </>
    );
}

export default home;