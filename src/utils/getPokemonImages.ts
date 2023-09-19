// @ts-nocheck

// the no check above is to exclusively tell TS interpreter not to check this file for ts errors

//import all Images Code dynamically
//ref: https://vitejs.dev/guide/features.html#glob-import

const fetchImages = (context: any) => {

  const imagePaths = [];
  //          note relative path vvv  using {eager: true} in the import      vvv this gets rid of promises
  // Object.values(context).forEach(({ default: path }) => {
  //   const url = new URL(path, import.meta.url);
  //   const data = {
  //     path: url.pathname,
  //   };
  //   imagePaths.push(data);
  // });

  for (const path in context) {
    context[path]().then((mod) => {
      imagePaths.push(path)
    })
  }
  return imagePaths;
};

export const images = fetchImages(
  import.meta.glob("../assets/pokemons/shiny/*.png|jpe?g|svg")
);
export const defaultImages = fetchImages(
  import.meta.glob("../assets/pokemons/default/*.png|jpe?g|svg")
);

//default low quality
//shinny high quality
