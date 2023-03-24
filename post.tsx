
const VirutalLine = () => {
	const [color, setColor] = useState<LightColorName>('none')
	const [lines, setLines] = useState('1')
	const [units, setUnits] = useState('meters')
	const [lineLength, setLinelength] = useState(3)
	const [isAutomated, setIsAutomated] = useState('no')
	const [mountingDistance, setMountingDistance] = useState(5)
	const [data, setData] = useState();
	const [brightNess, setBrightNess] = useState<BrightNess>({
		value: 200,
		unit: 'lux',
	})

 const [formvalue, setFormvalue]= useState({ numLines: '',mountingDistanceMeters:'', lineLengthMeters:'', color: '', ambientLightingConditions: '', series: '' });
 const [message, setMessage]= useState('');

 const handleInput =(e: { target: { name: any; value: any } })=>{
	 setFormvalue({...formvalue, [e.target.name]:e.target.value});
	 setMessage("data successfully added")
 }
 
 const handleSubmit = async(e) =>{
	e.preventDefault();
	console.log(formvalue);
	 try {
		const formData = { series:formvalue.series, mountingDistanceMeters: formvalue.mountingDistanceMeters, numLines: formvalue.numLines, lineLengthMeters: formvalue.lineLengthMeters, color: formvalue.color, ambientLightingConditions: formvalue.ambientLightingConditions}
		const res= await axios.post(`https://dev.laserglow.com/api/estimator_tool.php`, formData, 
		{headers: { 'Content-Type': 'multipart/form-data' }});    
		console.log(res.data) 
		 console.log(res.data.productName)
		console.log("Query Submited!!")
	 }
	  catch(error){
		 console.log("error:Not sending data")
	  }
   }      
	const disabled = color === 'none'
	const isMobile = useMediaQuery('(max-width: 768px)')[0]
	useProductSuggestions(
		{
			lightColor: color,
			numLines: Number(lines),
			lineLength,
			mountingDistance,
			ambientLightingConditions: brightNess,
		},
		disabled,
	)
	const results: Result[] = testArray.map((item) => ({
		color: color,
		brightness: brightNess,
		projectors: lineLength > 40 ? 2 : 1,
		lines: Number(lines) as 1 | 2,
		lineLength: lineLength,
		mountingDistance : mountingDistance
	}))
 // onsubmit button
// 	  const handleSubmit = (event) => {
// 		event.preventDefault();
//  const height = event.height.target.value;
//  const length = event.length.target.value;
//   const data = { height, length}
//    axios.post("https://dev.laserglow.com/api/estimator_tool.php", data)
//    .then((res) => {
// 	console.log(res)
// 	console.log(data)
//    }).catch((error) => console.error(error))	 
// 	  }

	return ( 
		<>
			<AppContainer>
			<div className="container">
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h5 className="mb-4">Send data to the API:</h5> 
                        <p className="text-sucess"> { message }</p>                 
                         <form onSubmit={ handleSubmit}>
                            <div className="mb-3 row">
                            <label className="col-sm-4">Mounting Height</label>
                            <div className="col-sm-6">
                            <input  name="mountingDistanceMeters" value={formvalue.mountingDistanceMeters} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            <label  className="col-sm-4">Desired Length: </label>
                            <div className="col-sm-6">
                            <input  name="lineLengthMeters" value={formvalue.lineLengthMeters} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>
							<div className="mb-3 row">
                            <label  className="col-sm-4">Color: </label>
                            <div className="col-sm-6">
                            <input type="text" name="color" value={formvalue.color} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>

							<div className="mb-3 row">
                            <label  className="col-sm-4">Ambeient Lighting LUX:</label>
                            <div className="col-sm-6">
                            <input type="text" name="ambientLightingConditions" value={formvalue.ambientLightingConditions} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>
							<div className="mb-3 row">
                            <label  className="col-sm-4">Series: </label>
                            <div className="col-sm-6">
                            <input type="text" name="series" value={formvalue.series} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>
							
							<div className="mb-3 row">
                            <label  className="col-sm-4">NumLines: </label>
                            <div className="col-sm-6">
                            <input type="text" name="numLines" value={formvalue.numLines} className="form-control" onChange={ handleInput}/>
                            </div>
                            </div>
                            <div className="mb-3 row">
                            
                            <div className="col-sm-10">
                           <button  name="submit" className="btn btn-success">Submit</button>
						
						{/* reading the data from the tesponse  */}
                            </div>
                            </div>

                         </form>
      
                    </div>
                </div>
				 {/* DISPLAY  RECOMMENDE RESULT */}
		
            </div>

			</AppContainer>
		 </>
	)
} 

export default VirutalLine
