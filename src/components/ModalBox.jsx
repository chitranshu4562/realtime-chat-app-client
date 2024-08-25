import {Box, Modal} from "@mui/material";

export default function ModalBox({ children, isOpen }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <Modal open={isOpen}>
                <Box sx={style}>
                    { children }
                </Box>
            </Modal>
        </>
    )
}
