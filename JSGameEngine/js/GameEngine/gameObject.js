class GameObject{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
        this.component = [];
    }

    addComponent(component){
        this.component.push(component);
        component.GameObject = this;
    }

    update(deltaTime){
        for(const component of this.component){
            component.update(deltaTime);
        }
    }

    draw(ctx){
        for(const component of this.component)
        {
            component.draw(ctx);
        }
    }

    getComponent(Component){
        return this.component.find((component)=> component instanceof componentClass);
    }
}

export default GameObject;