import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { List, Segment, Image, Button, Input } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import productsList from '../public/get-products.json'

export default function Home() {
  const router = useRouter()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsList)
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Price Buddy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a <a href="https://nextjs.org">Price Buddy</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <Input size='huge' icon='search' placeholder='Search...' />

        <Segment inverted style={{width:'100%'}}>
          <List divided inverted relaxed size='huge'>
            {products.map((product) => (
              <List.Item>
                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
                <List.Content>
                  <List.Header>{product.name} ${product.price}</List.Header>
                  SKU: {product.sku}
                </List.Content>
                <List.Content
                  floated='right'
                  onClick={() => router.push(`/product/${product.sku}`)}
                >
                  <Button>Editar</Button>
                </List.Content>
              </List.Item>
            ))}
            <List.Item>
              <List.Content>
                <List.Header>Snickerdoodle</List.Header>
                An excellent companion
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Poodle</List.Header>A poodle, its pretty basic
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <List.Header>Paulo</List.Header>
                He's also a dog
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
