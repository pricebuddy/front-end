import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios';

import { List, Segment, Image, Button, Input, Table, Header, Icon } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import productsList from '../public/get-products.json'

const RecommendationIcon = ({ recommendationType }) => {
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

export default function Home() {
  const router = useRouter()
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('')

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  export default function Home() {
    const router = useRouter()
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([])
    const [searchTerm, setSearchTerm] = React.useState('');

    const getSuggestion = (price, competitorPrice) => {
      const suggerence = price - competitorPrice > 0;
      switch (suggerence) {
        case true:
          return <span style={{color: 'green'}}>▲ {currencyFormatter.format(price - competitorPrice)}</span>
        default:
          return <span style={{color: 'red'}}>▼ {currencyFormatter.format(price - competitorPrice)}</span>
      }
    };

    const handleChange = event => {
      setSearchTerm(event.target.value);
    };

    useEffect(() => {
      const results = products.filter(product =>
        product.sku.toString().toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }, [searchTerm]);

    useEffect(() => {
      async function fetchProducts() {
        const {data} = await axios.get("http://localhost:3001/tenant/CFFD9A07-59CD-4DB2-98C8-BD312AB643EF/products");
        console.log(data);
        setProducts(data);
      }

      fetchProducts();
    }, []);

    return (
      <div className={styles.container}>
        <Head>
          <title>Price Buddy</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Hi. I'm <a href="#">Price Buddy</a>
          </h1>

          <p className={styles.description}>
            I can help u profit based on {' '}
            <code className={styles.code}>your competition</code>
          </p>

          <Input
            size='huge'
            icon='search'
            placeholder='Search by SKU...'
            onChange={handleChange}
          />

          <Table basic='very' celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>SKU</Table.HeaderCell>
                <Table.HeaderCell>Sugerencia</Table.HeaderCell>
                <Table.HeaderCell>Ripley</Table.HeaderCell>
                <Table.HeaderCell>Paris</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {searchResults.map((product) => (
                <Table.Row>
                  <Table.Cell onClick={() => router.push(`/product/${product.sku}`)}>
                    <Header as='h4' image>
                      <Image src={`https://falabella.scene7.com/is/image/Falabella/${product.sku}`} rounded
                             size='large'/>
                      <Header.Content>
                        {product.name}
                        <Header.Subheader>{currencyFormatter.format(product.price)}</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>#{product.sku}</Table.Cell>
                  <Table.Cell><RecommendationIcon
                    recommendationType={product.recommendation[0].action}/> {product.recommendation[0].action}
                  </Table.Cell>
                  <Table.Cell>{currencyFormatter.format(product.price)}</Table.Cell>
                  <Table.Cell>{currencyFormatter.format(product.price)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </main>

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
    );
  }
}
