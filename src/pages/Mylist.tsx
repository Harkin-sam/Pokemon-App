import Wrapper from "../sections/Wrapper";
import { useAppDispatch, useAppSelector } from "../redux-store/hook";
import Login from "../components/Login";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { useEffect } from "react";
import { getUserPokemons } from "../redux-store/reducers/getUserPokemons";

function Mylist() {
  const userInfo = useAppSelector((state) => state.app.userInfo);
  const userPokemons = useAppSelector((state) => state.pokemon.userPokemons)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch( getUserPokemons())
  },[userInfo, dispatch])


  return <div className="list">
    {
      userInfo ? <PokemonCardGrid  pokemons = {userPokemons}/> : <Login />
    }
    
  </div>;
}

export default Wrapper(Mylist);
