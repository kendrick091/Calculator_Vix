const displayDiv = document.getElementById('displayDiv');
import { goToAISolver } from './ai.js';

function displayFunction(){
    displayDiv.innerHTML = `
    <div class="calBody">
        <h2>Calculator Vix</h2>
        <div class="aiPageBtn" style="margin-bottom: 10px">
                <button id="aiSolverBtn">
                    Use AI Solver
                </button>
        </div>

        <div class="screenDiv">
            <input class="firstScreen" id="firstScreen" /><br>
            <input class="secondScreen" id="secondScreen" />
        </div>

        <div class="buttonDiv">
        <!--- for the scientific calculation Btn --->
            <div id="science">
    <div class="buttonList">
        <button id="addCos">cos</button>
        <button id="addSin">sin</button>
        <button id="addTan">tan</button>
        <button id="addLog">log</button>
    </div>

    <div class="buttonList">
        <button id="addLn">ln</button>
        <button id="sqrt">√</button>
        <button>(</button>
        <button>)</button>
    </div>

    <div class="buttonList">
        <button id="power">^</button>
        <button id="pi">π</button>
        <button id="angleMode">DEG</button>
    </div>
</div>

    <!---- usual calculator button below ---->

            <div class="buttonList">
                <button id="ac">AC</button>
                <button id="del">DEL</button>
                <button id="percentage">%</button>
                <button>/</button>
            </div>
            <div class="buttonList">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button id="x">x</button>
            </div>
            <div class="buttonList">
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>-</button>
            </div>
            <div class="buttonList">
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>+</button>
            </div>
            <div class="buttonList">
                <!--- <button>?!</button> ---->
                <button>.</button>
                <button>0</button>
                <button id="equlTo">=</button>
            </div>
            
            </div>
        </div>
    </div>
    `;

    const aiSolverBtn = document.getElementById('aiSolverBtn');
    aiSolverBtn.addEventListener("click", goToAISolver);

   let buttonValue = document.querySelectorAll('button');
   const firstScreen = document.getElementById('firstScreen')
   const secondScreen = document.getElementById('secondScreen')
   let angleMode = "DEG";

   const angleBtn = document.getElementById("angleMode");

angleBtn.addEventListener("click", ()=>{

    if(angleMode === "DEG"){
        angleMode = "RAD";
        angleBtn.innerText = "RAD";
    }else{
        angleMode = "DEG";
        angleBtn.innerText = "DEG";
    }

});

//    // Add btn for scientific calculation
//    let cos = document.getElementById('addCos')
//    let sin = document.getElementById('addSin')

   buttonValue.forEach((btn)=>{

    btn.addEventListener('click', ()=>{

        // ========================
        // EQUAL TO
        // ========================
        if(btn.innerText == "="){

            let fv = firstScreen.value;

            // Replace functions
            fv = fv.replace(/sin\((.*?)\)/g, (_, num)=>
                Math.sin(num * Math.PI / 180)
            );

            fv = fv.replace(/cos\((.*?)\)/g, (_, num)=>
                Math.cos(num * Math.PI / 180)
            );

            fv = fv.replace(/tan\((.*?)\)/g, (_, num)=>
                Math.tan(num * Math.PI / 180)
            );

            fv = fv.replace(/log\((.*?)\)/g, (_, num)=>
                Math.log10(num)
            );

            fv = fv.replace(/ln\((.*?)\)/g, (_, num)=>
                Math.log(num)
            );

            fv = fv.replace(/√\((.*?)\)/g, (_, num)=>
                Math.sqrt(num)
            );

            // Replace π
            fv = fv.replace(/π/g, Math.PI);

            // Replace x
            fv = fv.replace(/x/g, "*");

            // Replace power ^
            fv = fv.replace(/\^/g, "**");

            try{
                firstScreen.value = eval(fv).toLocaleString();
                secondScreen.value = '';
            }catch{
                secondScreen.value = "Error";
            }

        }

        // ========================
        // PERCENTAGE
        // ========================
        else if(btn.innerText == "%"){

            firstScreen.value = firstScreen.value / 100;
            secondScreen.value = firstScreen.value;

        }

        // ========================
        // CLEAR
        // ========================
        else if(btn.innerText == "AC"){

            firstScreen.value = '';
            secondScreen.value = '';

        }

        // ========================
        // DELETE
        // ========================
        else if(btn.innerText == "DEL"){

            firstScreen.value = firstScreen.value.slice(0, -1);
            secondScreen.value = '';

        }

        // ========================
        // SPECIAL BUTTONS
        // ========================
        else if(btn.innerText == "sin"){

            firstScreen.value += "sin(";

        }

        else if(btn.innerText == "cos"){

            firstScreen.value += "cos(";

        }

        else if(btn.innerText == "tan"){

            firstScreen.value += "tan(";

        }

        else if(btn.innerText == "log"){

            firstScreen.value += "log(";

        }

        else if(btn.innerText == "ln"){

            firstScreen.value += "ln(";

        }

        else if(btn.innerText == "√"){

            firstScreen.value += "√(";

        }

        else if(btn.innerText == "π"){

            firstScreen.value += "π";

        }

        else{

            firstScreen.value += btn.innerText;

            let fv = firstScreen.value;

            fv = fv.replace(/sin\((.*?)\)/g, (_, num)=>
                angleMode === "DEG"
                ? Math.sin(num * Math.PI / 180)
                : Math.sin(num)
            );

            fv = fv.replace(/cos\((.*?)\)/g, (_, num)=>
                angleMode === "DEG"
                ? Math.cos(num * Math.PI / 180)
                : Math.cos(num)
            );

            fv = fv.replace(/tan\((.*?)\)/g, (_, num)=>
                angleMode === "DEG"
                ? Math.tan(num * Math.PI / 180)
                : Math.tan(num)
            );

            fv = fv.replace(/log\((.*?)\)/g, (_, num)=>
                Math.log10(num)
            );

            fv = fv.replace(/ln\((.*?)\)/g, (_, num)=>
                Math.log(num)
            );

            fv = fv.replace(/√\((.*?)\)/g, (_, num)=>
                Math.sqrt(num)
            );

            fv = fv.replace(/π/g, Math.PI);

            fv = fv.replace(/x/g, "*");

            fv = fv.replace(/\^/g, "**");

            try{
                secondScreen.value = eval(fv).toLocaleString();
            }catch{
                secondScreen.value = '';
            }

        }

    })
   })

}
displayFunction()