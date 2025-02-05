import { list } from "@/actions/country";
import Link from "next/link";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import css from './styles.module.css';

interface Country {
  countryCode: string;
  name: string;
}

export default async function Countries() {
  const countries = await list();

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Country List
        </Typography>
        <List sx={{ bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}>
          {countries.map(({countryCode, name}: Country, idx: number) => (
            <Box key={idx}>
              <ListItem
                sx={{
                  "&:hover": { bgcolor: "action.hover" },
                  transition: "0.3s ease-in-out",
                }}
              >
                <Link href={`/list/${countryCode}?name=${name}`} passHref className={css['link']}>
                  <ListItemText
                    primary={name}
                    sx={{
                      "& a": {
                        textDecoration: "none",
                        color: "primary.main",
                        fontWeight: "bold",
                      },
                      "& a:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  />
                </Link>
              </ListItem>
              {idx !== countries.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
