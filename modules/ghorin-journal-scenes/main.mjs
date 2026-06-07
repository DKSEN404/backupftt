// ============================================================ 
//                  HOOKS on READY
// ============================================================ 
Hooks.on("ready", async function () {
    Scene.prototype._onClickDocumentLink = function (event) {        
        console.log(event);
        if (event.ctrlKey) {
            this.activate();
        } else if (event.altKey) {
            let maSceneId = event.target?.dataset?.id;
            if(maSceneId != null) {
                let maScene = game.scenes.get(maSceneId);
                maScene.sheet.render(true);
            }
        } else {
            this.view();
        }
    }  
});