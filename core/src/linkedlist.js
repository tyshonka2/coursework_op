export function rearrangeList(head) {
    let negHead = null, negTail = null;
    let posHead = null, posTail = null;
    let current = head;

    while (current) {
        let next = current.next;
        current.next = null;
        if (current.value < 0) {
            if (!negHead) negHead = negTail = current;
            else { negTail.next = current; negTail = current; }
        } else {
            if (!posHead) posHead = posTail = current;
            else { posTail.next = current; posTail = current; }
        }
        current = next;
    if (!negHead) {
    return posHead; 
         }
    }
}
negTail.next = posHead; 

return negHead;