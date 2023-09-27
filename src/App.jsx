
import { useState, useCallback,useEffect,useRef } from "react"


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumerAllow] = useState(false);
  const [CharacterAllow, setCharacterAllow] = useState(false);

  const [passWord, setPasword] =  useState();


  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (CharacterAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPasword(pass)


  }, [length, numberAllowed, CharacterAllow, setPasword]);

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,CharacterAllow,setPasword]);


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(passWord);
  }, [passWord])



  return (
    <>
            <div className="mycontainer mx-auto">
            <h1 className="text-3xl font-bold my-5 text-white text-center">Password Genretor App</h1>
              <div className="card bg-white px-8 rounded-xl p-8 white shadow-2xl">
                
                <div className="card-body">

                <div className="flex justify-between mb-3">
                <input className=" inputext py-1 px-3 " value={passWord} ref={passwordRef}
 readOnly/>
                <button className='bg-blue-700 text-white p-2 rounded-md' onClick={copyPasswordToClipboard}>Copy</button>
                </div>
                
                </div>
                <div className=" text-sm gap-x-2">
                    <h1>Character Lenght</h1>
                    <fieldset className="rangeSlider">
                    <input type="range" min={8} max={99}  className='cursor-pointer' value={length} onChange={(e)=>setLength(e.target.value)} />
                    </fieldset>
                   <fieldset>
                   {/* <input type="checkbox" className='cursor-pinter'/> */}
                   <label htmlFor="">length({length})</label>
                   
                   </fieldset>
                    <fieldset>
                    <input type="checkbox" className='cursor-pinter' value={Number} onChange={()=>setNumerAllow((prev) => !prev)} />
                    <label htmlFor="">Number</label>
                    </fieldset>
                    <fieldset>
                    <input type="checkbox" className='cursor-pinter'  value={CharacterAllow} onChange={()=>setCharacterAllow((prev)=>!prev)}/>
                    <label htmlFor="">Character</label>
                    </fieldset>
                </div>  
          
              </div>
            </div>
    </>
  )
}

export default App
