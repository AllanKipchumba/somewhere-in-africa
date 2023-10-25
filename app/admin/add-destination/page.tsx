import Card from '@/app/components/card/Card';
import styles from './add-destination.module.scss';

export default function AddDestination() {
  return (
    <div className={styles.destination}>
      <div className={styles.heading}>
        <h1>Add new destination</h1>
      </div>
      <Card cardClass={styles.card}>
        <form>
          <label>Destination</label>
          <input
            type='text'
            placeholder='add destination'
            required
            name='destination'
          />

          <label>Image</label>
          <Card cardClass={styles.group}>
            {/* {uploadProgress !== 0 && (
              <div className={styles.progress}>
                <div
                  className={styles['progress-bar']}
                  style={{ width: `${uploadProgress}%` }}
                >
                  {uploadProgress < 100
                    ? `Uploading ${uploadProgress}%`
                    : `Upload Complete ${uploadProgress}%`}
                </div>
              </div>
            )} */}

            <input
              type='file'
              accept='image/*'
              placeholder='destination image'
              name='image'
              // onChange={(e) => handleImageChange(e)}
            />

            {/* {product.imageURL !== '' && (
              <input
                type='text'
                required
                placeholder='image URL'
                name='imageURL'
                value={product.imageURL}
                disabled
              />
            )} */}
          </Card>

          <label>Category</label>
          <input type='text' placeholder='Category' required name='category' />

          <label>Price</label>
          <input
            type='number'
            placeholder='price'
            required
            name='price'
            // value={product.price}
            // onChange={(e) => handleInputChange(e)}
          />

          <label>Description</label>
          <textarea
            // type='text'
            name='description'
            // value={product.description}
            // onChange={(e) => handleInputChange(e)}
            // cols='30'
            // rows='10'
          ></textarea>

          <button className='--btn --btn-primary --btn-lg'>save</button>

          {/* <button className='--btn --btn-primary'>
            {detectForm(id, 'Save Product', 'Edit product')}
          </button> */}
        </form>
      </Card>
    </div>
  );
}
