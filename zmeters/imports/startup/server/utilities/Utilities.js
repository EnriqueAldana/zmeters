export default {

    generateNumberToken(min, max) {
        const num= Math.floor(Math.random() * (max+1-min) +min );
        return num;
    }
};

