import { details } from "@/actions/country";
import Image from "next/image";
import Link from "next/link";
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chart from "./components/Chart/Chart";
import css from "./styles.module.css";

interface CountryDetailsPageProps {
  params: { countryCode: string };
  searchParams: { name?: string };
}

export default async function CountryDetailsPage({ params, searchParams }: CountryDetailsPageProps) {
  const { countryCode } = params;
  const countryName = searchParams?.name || "Unknown Country";

  const countryInfo = await details({
    country: countryName,
    code: countryCode
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Country Details
        </Typography>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          href="/list"
          sx={{ mb: 4 }}
        >
          Back to list
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: "primary.main"
            }}
          >
            {countryName}
          </Typography>

          {countryInfo.flag ? (
            <Image src={countryInfo.flag} alt="flag" width={60} height={40} />
          ) : (
            <Typography color="text.secondary">No flag available</Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Neighboring Countries
        </Typography>
        {countryInfo.neighbors.length > 0 ? (
          <List>
            {countryInfo.neighbors.map(({ country, code }: { country: string; code: string }, idx: number) => (
              <ListItem key={idx} sx={{ "&:hover": { bgcolor: "action.hover" }, transition: "0.3s ease-in-out" }}>
                <Link href={`/list/${code}?name=${country}`} passHref className={css['link']}>
                  <ListItemText primary={country} sx={{ "& a": { textDecoration: "none", color: "primary.main" } }} />
                </Link>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No neighboring countries found.</Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Population Chart
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {countryInfo.population.length > 0 ?
            <Chart data={countryInfo.population} /> : <Typography>No population data available.</Typography>
          }
        </Box>
      </Paper>
    </Container>
  );
}
