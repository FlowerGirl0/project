import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { Card, Button, Modal, Badge } from 'react-bootstrap';


function ResultCard({ amenity, amenityName, result }) {
    const [showModal, setShowModal] = useState(false);

    function getDistance() {
        let dis;
        if (amenity?.distance < 1) {
            dis = amenity?.distance;
        } else {
            dis = amenity?.distance;
        }

        return (dis)
    }
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className='text-primary'>{getDistance()} <small style={{ fontSize: '12px' }}>{amenity?.distance < 1 ? "M" : "KM"}</small></Card.Title>
                    <Card.Text>
                        {amenity?.displayString}
                    </Card.Text>
                    <Button variant="primary" size='sm' onClick={() => setShowModal(true)}>View Details</Button>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{result.address}
                    </Modal.Title>
                    <Badge pill bg="success" className='mx-2'>Rank - {result.rank}</Badge>
                </Modal.Header>
                <Modal.Body className='pb-5'>
                    <Typography>Distance: {getDistance()} <b style={{ fontSize: '12px' }}>{amenity?.distance < 1 ? "M" : "KM"}</b></Typography>
                    <Typography className='my-2'>{amenity?.displayString}</Typography>
                    <Typography>Lat: {amenity?.place?.geometry?.coordinates[0]}</Typography>
                    <Typography>Lat: {amenity?.place?.geometry?.coordinates[1]}</Typography>

                   {amenity?.place?.properties?.city && <Typography>City: {amenity?.place?.properties?.city}</Typography>}
                    {amenity?.place?.properties?.countryCode && <Typography>Country Code: {amenity?.place?.properties?.countryCode}</Typography>}
                    {amenity?.place?.properties?.postalCod&&<Typography>Postal Code: {amenity?.place?.properties?.postalCode}</Typography>}
                    {amenity?.place?.properties?.city&&<Typography>State Code: {amenity?.place?.properties?.city}</Typography>}

                    
                    <Badge bg="secondary" className='my-2'>{amenityName}</Badge>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ResultCard;
