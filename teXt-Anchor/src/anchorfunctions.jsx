{
    getFunctions(time = thisLayer.time) {
        function funcError(funcName, ...errors) {
            return new Error(`in function ${funcName}.\n\n${errors.join('\n')}`);
        }

        function layerSize(layerIndex = thisLayer.index, sampleTime = time) {
            const layerSize = [
                thisComp.layer(layerIndex).sourceRectAtTime(sampleTime, false).width,
                thisComp.layer(layerIndex).sourceRectAtTime(sampleTime, false).height,
            ];
            return layerSize;
        }
        function layerRect({ layer = thisLayer, sampleTime = time, anchor = 'center', xHeight = true, }) {
            const sourceRect = layer.sourceRectAtTime(sampleTime, false);
            let { width, height, top, left } = sourceRect;
            let topLeft = [left, top];
            if (layer.text && xHeight) {
                const { fontSize, leading, autoLeading } = layer.text.sourceText.style;
                const lineGap = autoLeading ? fontSize * 1.2 : leading;
                const textSize = fontSize / 2;
                const numLines = textCount(layer.text.sourceText.value, 'line');
                height = lineGap * (numLines - 1) + textSize;
                topLeft = [left, -textSize];
            }
            const positions = {
                topLeft: topLeft,
                topRight: thisLayer.add(topLeft, [width, 0]),
                topCenter: thisLayer.add(topLeft, [width / 2, 0]),
                bottomCenter: thisLayer.add(topLeft, [width / 2, height]),
                bottomLeft: thisLayer.add(topLeft, [0, height]),
                bottomRight: thisLayer.add(topLeft, [width, height]),
                center: thisLayer.add(topLeft, [width / 2, height / 2]),
                leftCenter: thisLayer.add(topLeft, [0, height / 2]),
                rightCenter: thisLayer.add(topLeft, [width, height / 2]),
            };
            const position = positions[anchor];
            const onOwnLayer = layer === thisLayer;
            return {
                size: [width, height],
                position: onOwnLayer ? position : layer.toComp(position),
                sourceRect: sourceRect,
            };
        }
        function textCount(sourceText, type = 'word') {
            if (typeof sourceText !== 'string') {
                const valueHint = typeof sourceText === 'function' &&
                    `\n\nDid you mean sourceText.value?`;
                throw funcError(`textCount`, `Invalid value for sourceText.`, `Value must be a string, received ${typeof sourceText}.${valueHint ||
                    ''}`);
            }
            const counts = {
                word: text => text.split(' ').length,
                line: text => Math.max(text.split(/[^\r\n\3]*/gm).length - 1, 0),
                char: text => text.length,
            };
            if (!counts[type]) {
                throw funcError(`textCount`, `Invalid type: ${type}.\nValid types are: word, line, char`);
            }
            return counts[type](sourceText);
        }

        function hideDescenders(string = thisProperty.value, hideTime = -500) {
            const numLines = textCount(string, 'line');
            const descenderFreeLines = 'X\r'.repeat(numLines - 1) + 'X';
            return time < hideTime ? descenderFreeLines : string;
        }

        
        
        
        function offsetFromAnchor(position, [offsetX, offsetY], anchor) {
            switch (anchor) {
                case 'topLeft':
                    return thisLayer.add(position, [-offsetX, -offsetY]);
                case 'topRight':
                    return thisLayer.add(position, [offsetX, -offsetY]);
                case 'bottomRight':
                    return thisLayer.add(position, [offsetX, offsetY]);
                case 'bottomLeft':
                    return thisLayer.add(position, [-offsetX, offsetY]);
                default:
                    throw Error('Invalid anchor: ' + anchor);
            }
        }
        return {
            layerSize,
            layerRect,
            textCount,
            hideDescenders,
            offsetFromAnchor,
        };
    }
    
}