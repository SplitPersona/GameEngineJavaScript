import Component from "./component";

class Input extends Component{
    constructor(){
        super();
        this.keys = {};
        this.gamepadIndex = null;
    
        document.addEventListener("keydown", (event) => (this.keys[event.code] = true));
                document.addEventListener("keyup", (event) => (this.keys[event.code] = false));

        window.addEventListener("gamepadconnected", (event)=>{
            console.log("Gamepad Connected", event.gamepad)
            this.gamepadIndex = event.gamepad.index;
        });

        window.addEventListener("gamepaddisconnected", (event)=>{
            console.log("Gamepad Disconnected", event.gamepad)
            this.gamepadIndex = null;
        });


    }

    isKeyDown(key){
        return this.keys[key]||false;
    }

    

}