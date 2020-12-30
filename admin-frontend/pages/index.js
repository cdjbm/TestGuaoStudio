import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Header from './Header';

const sections = [
  { title: 'Tecnologia', url: '#' },
  { title: 'Diseño', url: '#' },
  { title: 'Negocios', url: '#' },
  { title: 'Politica', url: '#' },
  { title: 'VideoJuegos', url: '#' },
  { title: 'Ciencia', url: '#' },
  { title: 'Healthy', url: '#' },
  { title: 'Moda', url: '#' },
  { title: 'Viajes', url: '#' },
];

const footers = [
  {
    title: 'Compañia',
    description: ['Equipo', 'Historia', 'Contactanos', 'Locaciones'],
  },
  {
    title: 'Ayuda',
    description: ['Centro de ayuda', 'FAQ'],
  },
  {
    title: 'Legal',
    description: ['Politica de privacidad', 'Terminos de uso'],
  },
];

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    borderTop: `2px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    backgroundColor: '#d6d6d6',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Header title="GuaoBlogs" sections={sections} />
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              GuaoBlogs
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Crea un blog atractivo y adaptado a tu estilo. Dispones de un
              surtido de plantillas para elegir, fáciles de usar, con diseños
              flexibles y montones de imágenes de fondo, o puedes diseñar un
              blog totalmente nuevo.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="outlined" size="large" color="primary">
                    Crea tu blog
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Titulo
                    </Typography>
                    <Typography>
                      Resumen del blog: Lorem ipsum dolor sit amet consectetur
                      adipisicing elit.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Leer más
                    </Button>
                    <Button size="small" color="primary">
                      Ver mas tarde
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Container maxWidth="xl" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="center">
          {footers.map(footer => (
            <Grid item xs={6} sm={2} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
