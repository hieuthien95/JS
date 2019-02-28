<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
	  <router-link class="navbar-brand" :to="{ name: 'Hello' }">Vue Js</router-link>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	  </button>

	  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
		<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <router-link class="nav-item" tag="li" active-class="active" exact to="/about">
                    <a class="nav-link" >About</a>
            </router-link>
            <router-link class="nav-item" tag="li" active-class="active" to="/filter" >
                    <a class="nav-link">Filter/Mixin</a>
            </router-link>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">Transation</a>
                <div class="dropdown-menu">
                            <router-link class="nav-link active" to="/transation/choice-transation">Choice transation</router-link>
                            <router-link class="nav-link" to="/transation/sudoku">Transation Sudoku</router-link>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                Component
                </a>
                <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/component/component0">Component Slot</router-link>
                <router-link class="dropdown-item" to="/component/component1">Component Action</router-link>
                <router-link class="dropdown-item" to="/component/component2">Component Meta menu</router-link>
                <router-link class="dropdown-item" to="/component/component3">Component 2 ways</router-link>
                <router-link class="dropdown-item" to="/component/component4">Component data travel between 2 child by Bus</router-link>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                YESNO.WTF
                </a>
                <div class="dropdown-menu">
                <router-link class="dropdown-item" to="/yesnowtf/watcher">Watcher</router-link>
                <router-link class="dropdown-item" to="/yesnowtf/computed">Computed</router-link>
                <router-link class="dropdown-item" to="/yesnowtf/click">Click</router-link>
                </div>
            </li>

            <router-link class="nav-item" tag="li" active-class="active" to="/mix-vuex" >
                    <a class="nav-link">Vuex</a>
            </router-link>
            
            <router-link class="nav-item" tag="li" active-class="active" to="/form-order">
                <a class="nav-link">Form Order</a>
            </router-link>
            <router-link class="nav-item" tag="li" active-class="active" to="/form-login">
                <a class="nav-link">Login</a>
            </router-link>
            <router-link class="nav-item" tag="li" active-class="active" to="/form-regist">
                <a class="nav-link">Regist</a>
            </router-link>
            <router-link class="nav-item" tag="li" active-class="active" to="/form-logout">
                <a class="nav-link">Logout</a>
            </router-link>
		</ul>
	  </div>
	</nav>
</template>

<script>
export default {
    
}
</script>
