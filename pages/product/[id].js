import { useState, useEffect} from 'react'
import { Grid, Image, List, Button, Table } from 'semantic-ui-react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

const GridExampleColumnWidth = () => {
  const [product, setProduct] = useState({});
  useEffect(() => {

  });
  return (
    <div style={{padding:30}}>
      <Head>
        <title>Price Buddy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Grid>
          <Grid.Column width={7}>
            <h1 className={styles.title}>
              Name
            </h1>
            <p>Precio actual: $743875</p>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
            <h3>Sugerencias</h3>
            <List divided verticalAlign='middle'>
              <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg' />
                <List.Content>
                  <List.Header as='a'>Debes subir el precio</List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
                <List.Content>
                  <List.Header as='a'>Haz una promoción </List.Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                <List.Content>
                  <List.Header as='a'>Vende más en esta categoría</List.Header>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <h3>Otros Retails</h3>
            <List divided verticalAlign='middle'>
              <List.Item>
                <List.Content floated='right'>
                  <Button>Ver</Button>
                </List.Content>
                <Image avatar src='/ripley.png' />
                <List.Content>Ripley</List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated='right'>
                  <Button>Ver</Button>
                </List.Content>
                <Image avatar src='/paris.jpg' />
                <List.Content>Paris</List.Content>
              </List.Item>
              <List.Item>
                <List.Content floated='right'>
                  <Button>Ver</Button>
                </List.Content>
                <Image avatar src='/abcdin.png' />
                <List.Content>ABC Din</List.Content>
              </List.Item>
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
    </div>
  )
}

export default GridExampleColumnWidth