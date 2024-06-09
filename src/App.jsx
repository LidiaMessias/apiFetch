/*import './App.css'*/
import { Routes, Route, Link } from "react-router-dom";
import FetchPosts from './components/FetchPosts';
import PostManager from './components/PostManager';

function App() {

  return (
    <>
    <div className=" mt-10 text-center">
      <h1 className="text-4xl text-cyan-700 font-bold text-center mb-8" >CRUD com Fetch</h1>
      <Link to="/fetchposts" className=" bg-cyan-400 m-10 py-2 px-10 text-xl rounded-md font-semibold">Listar Produtos</Link>
      <Link to="/products" className=" bg-green-600 m-10 py-2 px-10 text-xl rounded-md font-semibold text-white">Gerenciar Produtos</Link>
    </div>
      <Routes>
        <Route path='/fetchposts' element={<FetchPosts />} />
        <Route path='/products' element={<PostManager />} />
      </Routes>
    </>
  )
}

export default App
