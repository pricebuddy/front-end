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

const GridExampleColumnWidth = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [productSku, setProductSku] = useState();
  useEffect(() => {
    async function fetchProd() {
      const prod = await axios.get(`http://localhost:3001/tenant/CFFD9A07-59CD-4DB2-98C8-BD312AB643EF/products/8332819`);
      setProduct(prod.data);
    }
    fetchProd();
  }, [product]);

  return (
    <div style={{padding:30}}>
      <Head>
        <title>Price Buddy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {product && (
        <Grid>
          <Grid.Column width={7}>
            <h1 className={styles.title}>
              {product.name}
            </h1>
            <p>Precio actual: {`$ ${new Intl.NumberFormat('es-CL').format(product.price)}`}</p>
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
                return (
                  <List.Item>
                    <List.Content floated='right'>
                      <a href={competitorPrice.competitorsUrl} target="_blank" rel="noreferrer noopener"><Button>Ver</Button></a>
                    </List.Content>
                    <Image avatar src={getCompetitorLogo(competitorPrice.competitorsName)} />
                    <List.Content>{`${competitorPrice.competitorsName} - $ ${new Intl.NumberFormat('es-CL').format(competitorPrice.price)}`}</List.Content>
                  </List.Item>
                )
              })}
            </List>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />

            <h3>Historico</h3>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
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
    </div>
  )
}

export default GridExampleColumnWidth