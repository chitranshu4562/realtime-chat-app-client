import {Backdrop, Box, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";

export default function LinearBackdropLoader() {
    const open = useSelector((state) => state.loader.show);
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', display: 'flex', alignItems: 'baseline', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Backdrop>
        </>
    )
}
