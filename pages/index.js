import postModel from '../models/Post'
import mongoose, { set } from 'mongoose'
import Post from '../components/post'
import verifyJWTCookie from './api/verifyJWTCookie'
export default function Home({ posts }) {
  return (
    <div class="container px-5 py-24 mx-auto text-gray-600 body-font">
      <div class="flex flex-wrap -m-4">
        {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((post) =>
          <Post post={post} />
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const verify = verifyJWTCookie(context.req.headers.cookie)
  if (verify.success) {
    if (!mongoose.connections[0].readyState)
      await mongoose.connect(process.env.MONGO_URI)
    let posts = await postModel.find()
    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) }
    }
  }
  else {
    return {
      redirect: {
        permanent: false,
        destination: "/signIn",
      },
      props: {},
    };
  }
}
