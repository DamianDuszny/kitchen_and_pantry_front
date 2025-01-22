import {requestResponse} from "../../domain/requestResponse";
export default function RequestResponseMessage({ requestResponse }: { requestResponse: requestResponse | null }) {
     return (requestResponse &&
         <div className={`alert ${requestResponse.success ? 'alert-success' : 'alert-warning'}`}>
         <p>{requestResponse.message}</p>
     </div>
     )
}
