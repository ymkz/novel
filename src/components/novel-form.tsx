import { Form } from "remix"
import { IconSubmit } from "~/components/icon-submit"

export const NovelForm = () => {
  return (
    <div className="header">
      <div className="facade">
        <Form className="form" method="post" action="/api/add" reloadDocument>
          <input
            className="input"
            placeholder="https://ncode.syosetu.com"
            name="url"
          />
          <button className="submit" type="submit">
            <IconSubmit />
          </button>
        </Form>
      </div>
    </div>
  )
}
