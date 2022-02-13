import {useState, useEffect} from 'react'

export const Home = () => {
  const [baseApi, setBaseApi] = useState([])
  
  // Fetch top level api and set state 
  const getTopLevelData = async () => {
    const url = "https://api.github.com/orgs/BoomTownROI"
    try {
      const response = await fetch(url);
      let baseApi = await response.json();
      //convert json into array to be able to iterate through
      baseApi = Object.entries(baseApi).map((e) => ( { [e[0]]: e[1] } ))
      setBaseApi(baseApi)
      return baseApi
  } catch (error) {
      console.log("error", error);
    }
  } 


  // ideal world I would turn json object into an array, then create an array that just include the 
  //_url path. then 

  // const mapDataUrls = () => {
  //   const urlPaths = baseApi.includes('_url')
  //   console.log(urlPaths)
  // }
  
  useEffect(() => {
    getTopLevelData()
    // console.log(baseApi)
    // arrayifyData()

  
  }, []);


  return(
    <div>
      <p>hello world</p>
    </div>
  )
}