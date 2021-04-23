import { Grid, MenuItem, TextField, Tooltip } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import CardWithTitle from 'src/components/shared/CardWithTitle'
import Form from 'src/components/shared/Form'
import LoadingBackdrop from 'src/components/shared/LoadingBackdrop'
import Select from 'src/components/shared/Select'
import useAxios from 'src/hooks/useAxios'
import { Category } from 'src/types/Category'
import { Subcategory } from 'src/types/Subcategory'
import useStyles from './styles'

type Inputs = {
  name: string
  categoryID: string
  subCategoryID: string
  cityID: string
  districtID: string
  detail: string
  sex: string
  vaccination: true
  age: 0
  price: 0
  origin: string
  mainImage: string
  images: string[]
}

export default function CreatePost() {
  const classes = useStyles()

  const { control, register } = useForm<Inputs>()

  const { data: categories, loading: loadingCategories } = useAxios<Category[]>({
    config: {
      method: 'get',
      route: 'category'
    },
    fetchOnMount: true
  })

  const { fetch: getSubcategories, data: subcategories, loading: loadingSubcategories } = useAxios<Subcategory[]>({
    config: {
      method: 'get',
      route: 'subcategory'
    }
  })

  return (
    <Form>
      <LoadingBackdrop open={loadingCategories} />

      <Grid container>
        <Grid
          item
          xs={6}
        >
          <CardWithTitle title="Thông tin thú cưng">
            <TextField
              fullWidth
              required
              label="Tiêu đề tin đăng"
              name="name"
            />

            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Loại thú cưng"
              name="categoryID"
            >
              {categories?.map(category => (
                <MenuItem
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Select>
      
            <Tooltip
              className={classes.tooltip}
              placement="bottom"
              title={!subcategories?.length ? 'Hãy chọn Loại thú cưng trước' : ''}
            >
              <div>
                <Select
                  fullWidth
                  required
                  control={control}
                  defaultValue=""
                  disabled={!subcategories?.length}
                  label="Giống thú cưng"
                  name="subCategoryID"
                >
                  {subcategories?.map(subcategory => (
                    <MenuItem
                      key={subcategory._id}
                      value={subcategory._id}
                    >
                      {subcategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </Tooltip>

            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Giới tính"
              name="sex"
            >
              <MenuItem value="MALE">
          Đực
              </MenuItem>

              <MenuItem value="FEMALE">
          Cái
              </MenuItem>
            </Select>

            <Select
              fullWidth
              required
              control={control}
              defaultValue=""
              label="Đã tiêm chủng"
              name="vaccination"
            >
              <MenuItem value="YES">
          Có
              </MenuItem>

              <MenuItem value="NO">
          Không
              </MenuItem>
            </Select>
          </CardWithTitle>
        </Grid>
      </Grid>

      
    </Form>
  )
}
