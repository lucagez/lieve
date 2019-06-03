// SUPER FASTER
const find = (lookup, queryDelimiter) => {
  const hasQuery = new RegExp(`\\${queryDelimiter}`);
  const matchQuery = new RegExp(`\\${queryDelimiter}(.*)`);

  return (url) => {
    // Initializing the final path to an empty string
    let path = '';
    let query;
    const params = [];

    // Process url pieces
    const pieces = url.split('/');

    const last = pieces.length;
    const slast = last - 1;

    // If a question mark is found inside the url it means
    // that the url is carrying query string parameter.
    // So, we need to destroy them to process against the Set storing all
    // the available endpoint pieces.
    if (hasQuery.test(url)) {
      pieces[slast] = pieces[slast].replace(matchQuery, (match) => {
        // Deleting delimiter  from query string
        query = match.substr(1);
        return '';
      });
    }

    // Ugly for-loop but **WAY** faster than a more shiny .map
    for (let i = 0; i < last; i++) {
      const piece = pieces[i];
      // Here is the power of the Set for storing pieces.
      // .has takes O(1) time, while a search in an array would take O(n).
      if (lookup.has(piece)) path += piece;
      else {
        // Everything that is not recognised will be called :par and returned in an array.
        // This is convenient as the order of insertion will be equal as in the endpoint
        // definition.
        // Params can be queried like that:
        // const [par1, par2] = params;
        params.push(piece);
        path += ':par';
      }
    }

    return { path, params, query };
  };
};
export default find;
