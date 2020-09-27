import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { Grid, Image, List, Button, Table, Icon } from 'semantic-ui-react'
import Head from 'next/head'
import axios from "axios";
import styles from '../../styles/Home.module.css'

const getCompetitorLogo = (competitorName) => {
  switch(competitorName.toLowerCase()) {
    case 'ripley':
      return '/ripley.png';
    case 'paris':
      return '/paris.jpg';
    default:
      return '/abcdin.png';
  }
};

const RecommendationIcon = ({ recommendationType }) => {
  console.log(recommendationType);
  if (recommendationType === "keep") {
    return <Icon color='blue' name='thumbs up outline' size="large" />;
  }
  if (recommendationType === "increase") {
    return <Icon color='green' name='angle double up' size="large" />;
  }
  if (recommendationType === "decrease") {
    return <Icon color='yellow' name='angle double down' size="large" />;
  }
  return null;
};

export async function getServerSideProps(context) {
  const { data } = await axios.get(`http://localhost:3001/tenant/CFFD9A07-59CD-4DB2-98C8-BD312AB643EF/products/${context.query.id}`);
  return {
    props: { data }, // will be passed to the page component as props
  }
}

const GridExampleColumnWidth = ({ data }) => {
  const router = useRouter();
  const [product, setProduct] = useState(data);
  const [productSku, setProductSku] = useState();

  return (
    <div>
      <Head>
        <title>Price Buddy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.navbar}>
        <h1 onClick={() => router.push("/")}>PriceBuddy</h1>
      </div>
      {product && (
        <Grid container textAlign={"center"}>
          <Grid.Column width={7}>
            <h4 className={styles.title}>
              {product.name}
            </h4>
            <h1>Precio actual: {`$ ${new Intl.NumberFormat('es-CL').format(product.price)}`}</h1>
            <Image src={`https://falabella.scene7.com/is/image/Falabella/${product.sku}`} />
            <h3>Sugerencias</h3>
            <List divided verticalAlign='middle'>
              {product.recommendation.map(recommendation => {
                return (
                  <List.Item>
                    <RecommendationIcon recommendationType={recommendation.action} />
                    <List.Content>
                      <List.Header as='a'>{`${recommendation.message}`}</List.Header>
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <h3>Otros Retails</h3>
            <List divided verticalAlign='middle'>
              {product.competitorPrices && product.competitorPrices.map(competitorPrice => {
                if (competitorPrice.competitorsName) {
                  const compName = competitorPrice.competitorsName ? competitorPrice.competitorsName : "";
                  return (
                    <List.Item>
                      <List.Content floated='right'>
                        <a href={competitorPrice.competitorsUrl} target="_blank" rel="noreferrer noopener"><Button>Ver</Button></a>
                      </List.Content>
                      <Image avatar src={getCompetitorLogo(compName)} />
                      <List.Content>{`${compName} - $ ${new Intl.NumberFormat('es-CL').format(competitorPrice.price)}`}</List.Content>
                    </List.Item>
                  )
                }
              })}
            </List>

            <h3>Historico</h3>
            <Image src='https://docs.looker.com/assets/images/dashboard-reference-line-610.png' />
          </Grid.Column>
          <Grid.Column width={12}>
            <h2>Costo de entrega</h2>
            <Table padded='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Región</Table.HeaderCell>
                  <Table.HeaderCell>Tu</Table.HeaderCell>
                  <Table.HeaderCell>Paris</Table.HeaderCell>
                  <Table.HeaderCell>Ripley</Table.HeaderCell>
                  <Table.HeaderCell>Tricot</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                  <Table.Cell>$7999</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      )}
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          SHA-WRM@
        </a>
      </footer>
    </div>
  )
}

export default GridExampleColumnWidth