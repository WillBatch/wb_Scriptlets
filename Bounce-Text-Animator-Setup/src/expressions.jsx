var bounceExpression = "freq = effect(\"Bouncy Text\")(\"Frequency\");\
decay = effect(\"Bouncy Text\")(\"Decay\");\
duration = effect(\"Bouncy Text\")(\"Duration\");\
speed = effect(\"Bouncy Text\")(\"Slowness\")\
animationStartCheckbox = effect(\"Bouncy Text\")(\"Set Animation Start (Keyframe)\");\
orderArray = [textIndex*thisComp.frameDuration*speed, textTotal*thisComp.frameDuration*speed - textIndex*thisComp.frameDuration*speed];\
order = orderArray[effect(\"Bouncy Text\")(\"Reverse Order\").value];\
try{keystart = animationStartCheckbox.key(1).time}catch(err){keystart = inPoint};\
t = time - (keystart + order);\
startVal = [100,100,100];endVal = [0,0,0];\
if(effect(\"Bouncy Text\")(\"Enable\").value == 1){\
if (t < duration){\
linear(t,0,duration,startVal, endVal);\
}else{\
amp = (startVal - endVal)/duration;\
w = freq*Math.PI*2;\
endVal - amp*(Math.sin((t-duration)*w)/Math.exp(decay*(t-duration))/w);}\
}else{\
[100,100,100];\
	}"