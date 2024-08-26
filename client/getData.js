const getData = async () => {
  const res = await fetch('http://localhost:5000/api/players');
  const data = await res.json();

  return data;
};

export default getData;
