/* /*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 *)

function hasWrapper(el) {
  return !!el.firstElementChild && window.getComputedStyle(el.firstElementChild).display === 'block';
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);
    if (!hasWrapper(summary)) {
      summary.innerHTML = `<p>${summary.innerHTML}</p>`;
    }
    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';
    if (!hasWrapper(body)) {
      body.innerHTML = `<p>${body.innerHTML}</p>`;
    }
    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });
}
 */

export function generateAccordionDOM(block) {
  const details = document.createElement("details");
  const summary = document.createElement("summary");
  details.append(summary);
  Array.from(block.children).forEach(async (element, i) => {
    if (i === 0) {
      // const heading = element.querySelector("h2,h3,h4,h5,h6");
      const heading = element;
      summary.append(heading || element.textContent.trim());
    } else {
      try {
        const url = element.innerText.trim();
        const isurl = url.includes(".json");
        const elementText = element.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        var elementDiv = document.createElement("div");
        if (isurl) {
          let data = await renderDataFromAPI(url);
          const documentHTMl = KYCDocuments(data);
          elementDiv.innerHTML = documentHTMl;
        } else {
          elementDiv.innerHTML = elementText;
        }
      } catch (error) {
        console.warn(error);
      }
      details.append(elementDiv);
    }
  });
  return details;
}
export default function decorate(block) {
  const dom = generateAccordionDOM(block);
  block.textContent = "";
  block.append(dom);
}