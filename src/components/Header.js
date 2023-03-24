import React from "react";
import {NavLink,} from "react-router-dom";
import {useState} from "react";

function Header() {
  const [mobMenu, setMobMenu] = useState('hidden')


  //get current theme and set it to useState
  let currentTheme = localStorage.getItem('theme');
  if(currentTheme === null){
    currentTheme = 'light'
  }
  const [theme, setTheme] = useState(currentTheme);

  // Set theme from localStorage
  React.useLayoutEffect(() => {
    if(document.documentElement.className !== theme){
      document.documentElement.className = '';
      document.documentElement.classList.add(theme);
    }
  }, [theme])

  // Change theme
  function changeTheme(){
    let newTheme;
    if(theme !== 'dark'){
      setTheme('dark')
      newTheme = 'dark'
    }
    else {
      setTheme('light')
      newTheme = 'light'
    }
    localStorage.setItem('theme', newTheme)
  }

  function changeMobMenu(){
    if(mobMenu === 'hidden'){
      setMobMenu('')
    }
    else {
      setMobMenu('hidden')
    }
  }

  function closeMenu(){
    setMobMenu('hidden');
  }

  return (
    <>
      <div>
        <div className="flex-none mx-6 md:mx-0">
          <div className="flex place-content-between py-4 border-b border-b-indigo-500 pb-3 dark:border-b-orange-500">
            <a href="/" className="font-bold text-4xl mr-8 dark:text-white"><span className="text-purple-700 dark:text-orange-500">8</span>Seconds</a>
            <div className="hidden md:flex md:block">
              <nav>
                <ul className="flex space-x-3 md:space-x-10 pt-3 dark:text-white">
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/note">Note</NavLink></li>
                  <li><NavLink to="/create">Create</NavLink></li>
                  <li><NavLink to="/about">About</NavLink></li>
                </ul>
              </nav>
              <label className="switch ml-4 mt-3">
                <input type="checkbox" id="dark-mode-switch" checked={(theme === 'dark')} onChange={changeTheme}/>
                <span className="slider"></span>
              </label>
            </div>
            <button className="md:hidden" onClick={changeMobMenu}>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[50px] h-[38px] rounded-lg text-center">
                <div className="pt-2 border-b-4 border-white-500 w-1/2 mx-auto"></div>
                <div className="pt-1 border-b-4 border-white-500 w-3/4 mx-auto"></div>
                <div className="pt-1 border-b-4 border-white-500 w-1/2 mx-auto"></div>
              </div>
            </button>
          </div>
        </div>
        {/*mobile menu*/}
        <div className={mobMenu + " absolute right-6 top-14 py-3 px-8 bg-white rounded-lg shadow-2xl transition-all"}>
          <nav className="md:hidden flex flex-col">
            <ul className="">
              <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/note" onClick={closeMenu}>Note</NavLink></li>
              <li><NavLink to="/create" onClick={closeMenu}>Create</NavLink></li>
              <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            </ul>
            <label className="switch mt-3">
              <input type="checkbox" id="dark-mode-switch" checked={(theme === 'dark')} onChange={changeTheme}/>
              <span className="slider"></span>
            </label>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
