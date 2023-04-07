import { Container } from 'react-bootstrap'
import MainNav from '@/components/MainNav'
import { ToastContainer } from 'react-toastify'

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
            </Container>
            <br />
            <ToastContainer position='top-right' closeOnClick />
        </>
    )
}