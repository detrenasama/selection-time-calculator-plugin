let currentTestName = '';
let totalTests = 0;
let successTests = 0;
let failedTests = 0;
let timer;

const success = () => {
    successTests++;
    console.log(`${currentTestName} OK`);
}

const fail = (reason) => {
    failedTests++;
    console.error(`Test '${currentTestName}' FAIL. Reason: ${reason}`);
}

const eq = (expected, actual) => {
    if (expected !== actual)
        throw new Error(`Expected value '${expected}' is not equal to actual '${actual}'`)
}

const test = (name, definition) => {
    currentTestName = name;
    totalTests++;

    try {
        definition()
        success();
    } catch (e) {
        fail(e.message)
    }

    if (timer)
        clearTimeout(timer)

    timer = setTimeout(() => {

        console.log("")
        console.log(`Total: ${totalTests}, Success: ${successTests}, Failed: ${failedTests}`)
    })
}

export default test;
export {eq};
