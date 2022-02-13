import {useState, useEffect} from 'react'

export const Home = () => {
  useEffect(() => {
    const url = "https://api.github.com/orgs/BoomTownROI"
    
    const fetchData = async () => {
      try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
      } catch (error) {
          console.log("error", error);
      }
  };
    fetchData()
  }, []);


  return(
    <div>
      <p>hello world</p>
    </div>
  )
}