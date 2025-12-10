import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
]

const navStyles = {
    color: 'inherit', typography: 'h6', textDecoration: 'none',
    '&:hover': {
        color: 'grey.400'
    },
    '&.active': {
        color: '#979597ff'
    }
}

type Props = {
    toggleDarkMode: () => void;
    darkMode: boolean;
}

export default function NavBar({ darkMode, toggleDarkMode }: Props) {
    const { data: basket } = useFetchBasketQuery();

    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center ' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component={NavLink} sx={navStyles} to='/' variant="h6">
                        RE-STORE
                    </Typography>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' size="large" sx={{ color: 'inherit' }}>
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>

            </Toolbar>
        </AppBar>
    )
}
