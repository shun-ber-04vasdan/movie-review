import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from '../styles/Home.module.css'
import { getAllPosts } from "./utils/api";
import { PostType } from "./utils/Types";
import Link from "next/link";

type Props = {
  posts: PostType[];
}

export async function getStaticProps() {
  const posts: PostType[] = await getAllPosts();

  return {
    props: {
      posts,
    }
  }
}

export default function Home({ posts }: Props) {
  return (
    <div className={styles.container}>
      <h1>映画レビューブログ</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`}>
            <li className={styles.post} key={post.id}>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.author}>{post.author}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
