export function generateUid(): number {
    let result = Date.now().toString().slice(-4) + Math.random().toString().slice(-4);
    return parseInt(result);
}