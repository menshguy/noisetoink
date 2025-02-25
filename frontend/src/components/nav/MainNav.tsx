import './MainNav.css'
import { useAppMode } from '../../context/AppModeContext';

const MainNav = () => {
  const {appMode} = useAppMode();

	return (
		<nav id="main-nav">
			<div className="nav-left">
				<a href="/" id="nav-logo">
					<span className="noise">Noise</span> to <span className="ink">Ink</span>
				</a>
				{/* 
          <a href="/demo/artist">Artists Demo</a>
          <a href="/demo/customer">Customer Demo</a> 
        */}
			</div>
			<div className="nav-right">
        {/* TODO: Host Server Somewhere and uncomment these routes. Right now server/db isn't running */}
				{appMode !== "demo" && (
          <>
          <a href="/signin" className="nav-link">Sign In</a>
          <a href="/signup" className="nav-button">Sign Up</a>
          </>
        )}
				<a title="I am the developer of this project! Feel free to email me directly with feedback, ideas, or just to chat!" href="mailto:fenster.js@gmail.com">Contact Me</a>
			</div>
		</nav>
	)
}

export default MainNav 