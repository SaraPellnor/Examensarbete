import{u as V,r,U as q,P as z,j as e,c as w,d as A,e as G,f as H,F as J}from"./index-BQlZyj7B.js";const W=()=>{const B=V(),{loggedinUser:j,setErrorMessage:D}=r.useContext(q),{products:c,setProducts:g,categories:L,updateProduct:T,createProduct:U,deleteProduct:E}=r.useContext(z),i=r.useRef(null),[_,k]=r.useState(),[v,C]=r.useState(),[P,y]=r.useState(),[f,b]=r.useState(),[d,x]=r.useState(!1),[F,I]=r.useState(),[a,m]=r.useState([]),[N,o]=r.useState(!1),S=L.filter(t=>t.type==="menu"),M=t=>{const s=a.filter(n=>n!==t);m(s)},R=(t,s,n)=>{const l=n.filter(h=>h!==s),u={...t,category:l},p=c.map(h=>h._id===u._id?u:h);g(p)},K=(t,s,n)=>{n.push(s);const l={...t,category:n},u=c.map(p=>p._id===l._id?l:p);g(u)},O=t=>{const s={category:t.category,in_stock:_||t.in_stock,product_description:f||t.product_description,product_image:d||t.product_image,product_price:v||t.product_price,product_title:P||t.product_title};T(s,t._id)},$=()=>{U({category:a,in_stock:_,product_description:f,product_image:d,product_price:v,product_title:P})};return r.useEffect(()=>{D("Du är inte behörig"),(!j||j.is_admin==!1)&&B("/error"),x(!1)},[c]),e.jsxs("div",{className:"editProductCard",children:[e.jsxs("div",{className:"addProductDiv",children:[e.jsx("h3",{children:"Skapa en ny produkt"}),e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Produktbild"}),e.jsx("th",{children:"Lagersaldo"}),e.jsx("th",{children:"Pris"}),e.jsx("th",{children:"Titel"}),e.jsx("th",{children:"Beskrivning"}),e.jsx("th",{children:"Produktkategori"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("input",{type:"file",ref:i,style:{display:"none"},onChange:t=>x(t.target.value.split("\\").pop())}),d&&e.jsx("img",{src:`../../../src/assets/${d}`,alt:d}),e.jsx("p",{className:"addPic",onClick:()=>i.current.click(),children:"Välj bild"})]}),e.jsx("td",{children:e.jsx("input",{placeholder:"Ange lagersaldo...",onChange:t=>k(t.target.value),type:"number"})}),e.jsx("td",{children:e.jsx("input",{placeholder:"Ange pris...",onChange:t=>C(t.target.value),type:"number"})}),e.jsx("td",{children:e.jsx("input",{placeholder:"Ange titel...",onChange:t=>y(t.target.value),type:"text"})}),e.jsx("td",{children:e.jsx("input",{className:"descriptionInput",placeholder:"Ange beskrivning...",onChange:t=>b(t.target.value),type:"text"})}),e.jsx("td",{children:N==!0?e.jsx("div",{onMouseLeave:()=>o(!1),children:S.map(t=>e.jsxs("div",{className:"categoryDropdown",children:[a.includes(t._id)?e.jsx(w,{onClick:()=>M(t._id)}):e.jsx(A,{onClick:()=>m([...a,t._id])}),t.category_title]},t._id))}):e.jsx("p",{onClick:()=>o(!0),children:"Kategorier"})})]})})]}),e.jsx("button",{onClick:()=>$(),children:"Spara"})]}),e.jsx("h3",{children:"Uppdatera befintliga produkter"}),e.jsx("div",{className:"newProduct",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Produktbild"}),e.jsx("th",{children:"Lagersaldo"}),e.jsx("th",{children:"Pris"}),e.jsx("th",{children:"Titel"}),e.jsx("th",{children:"Beskrivning"}),e.jsx("th",{children:"Produktkategori"})]})}),e.jsx("tbody",{children:c.map(t=>e.jsxs("tr",{children:[e.jsxs("td",{className:"imgPickerDiv",children:[e.jsx("input",{type:"file",ref:i,style:{display:"none"},onChange:s=>x(s.target.value.split("\\").pop())}),e.jsx("button",{className:"addPic",onClick:()=>{i.current.click(),I(t._id)},children:e.jsx(G,{})}),e.jsx("img",{src:`../../../src/assets/${d&&F===t._id?d:t.product_image} `,alt:t.product_image})]}),e.jsx("td",{children:e.jsx("input",{value:t.in_stock,onChange:s=>k(s.target.value),type:"number"})}),e.jsx("td",{children:e.jsx("input",{value:t.product_price,onChange:s=>C(s.target.value),type:"number"})}),e.jsx("td",{className:"tdTitle",children:e.jsx("input",{value:t.product_title,onChange:s=>y(s.target.value),type:"text"})}),e.jsx("td",{children:e.jsx("input",{value:t.product_description,onChange:s=>b(s.target.value),type:"text"})}),e.jsx("td",{onMouseLeave:()=>o(!1),children:N==t._id?S.map(s=>e.jsxs("div",{children:[t.category.includes(s._id)?e.jsx(w,{onClick:()=>R(t,s._id,t.category)}):e.jsx(A,{onClick:()=>K(t,s._id,t.category)}),s.category_title]},s._id)):e.jsx("p",{onClick:()=>o(t._id),children:"Kategorier"})}),e.jsx("td",{children:e.jsxs("div",{className:"handleUpdateDiv",children:[e.jsx("button",{className:"saveBtn",onClick:()=>O(t),children:e.jsx(H,{})}),e.jsx("button",{className:"deleteBtn",onClick:()=>E(t._id),children:e.jsx(J,{})})]})})]},t._id))})]})})]})};export{W as default};