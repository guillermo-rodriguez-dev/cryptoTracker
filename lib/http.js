class Http {
  static instance = new Http();
  get = async url => {
    try {
      let req = await fetch(url);
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('http get error', error);
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('http POST error', error);
      throw Error(error);
    }
  };

  remove = async url => {
    try {
      const request = await fetch(url, {
        method: 'DELETE',
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP DELETE Error: ', err);
      throw Error(err);
    }
  };

  put = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'PUT',
        body,
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.error('HTTP PUT Error: ', err);
      throw Error(err);
    }
  };
}

export default Http;
