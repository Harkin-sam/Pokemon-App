// @ts-nocheck

// the no check above is to exclusively tell TS interpreter not to check this file for ts errors

//import all Images Code dynamically

const fetchImages = (context: string) => {
    const images = {};
    const cache = {};
    function importAll(r) {
      r.keys().forEach((key) => (cache[key] = r(key)));
    }
    importAll(context);
    Object.entries(cache).forEach((module: string[]) => {
      let key = module[0].split("");
      key.splice(0, 2);
      key.splice(-4, 4);
      images[[key.join("")]] = module[1];
    });
    return images;
  };
  
  export const images = fetchImages(
    require.context("../assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
  );
  export const defaultImages = fetchImages(
    require.context("../assets/pokemons/default", false, /\.(png|jpe?g|svg)$/)
  );


  //default low quality
  //shinny high quality