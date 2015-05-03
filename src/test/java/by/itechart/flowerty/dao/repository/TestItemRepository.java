package by.itechart.flowerty.dao.repository;



import by.itechart.flowerty.config.aware.JpaConfigurationAware;
import by.itechart.flowerty.persistence.model.Goods;
import by.itechart.flowerty.persistence.model.Item;
import by.itechart.flowerty.persistence.model.Order;
import by.itechart.flowerty.persistence.repository.ItemRepository;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
@author Мария 30.03.15
 */
public class TestItemRepository extends JpaConfigurationAware {
    @Autowired
    private ItemRepository itemRepository;

    @Ignore
    @Test
    public void findItem_ValidId_ReturnsItem() {
        Item item = itemRepository.findOne(1l);
        Assert.assertEquals(item.getQuantity(), 10);
        Assert.assertEquals(item.getGoods().getFlower().getName(), "Yellow Tulip");
    }

    @Ignore
    @Test
    public void findItem_InValidId_ReturnsNull() {
        Item item = itemRepository.findOne(1000l);
        Assert.assertNull(item);
    }
    @Ignore
    @Test
    public void saveItem_ValidItem_ReturnsSameItem() {
        Goods goods = new Goods();
        goods.setId(1l);
        Item item = new Item();
        item.setGoods(goods);
        item.setQuantity(10);
        Order order = new Order();
        order.setId(1l);
        item = itemRepository.save(item);
        Assert.assertEquals(10, item.getQuantity());
        Assert.assertEquals(goods, item.getGoods());
    }
    @Ignore
    @Test
    public void findItemsByOrder_ValidOrder_ReturnsPageOfItems() {
        Order order = new Order();
        order.setId(1l);
        //Page page = itemRepository.findByOrder(order, new PageRequest(0, 10));
        //Assert.assertNotEquals(page.getContent().size(), 0);
        //Assert.assertEquals(((Item)(page.getContent().get(0))).getQuantity() , 10);
    }

    @Ignore
    @Test
    public void findItemsByOrder_NullOrder_ReturnsEmptyPage() {
        Order order = null;
        //Page page = itemRepository.findByOrder(order, new PageRequest(1, 10));
        //Assert.assertEquals(page.getContent().size(), 0);
    }

    @Ignore
	@Test
	public void findByBadOrder() {
		Order order = new Order();
		order.setId(1000l);
		//Page page = itemRepository.findByOrder(order, new PageRequest(1, 10));
		//Assert.assertEquals(page.getContent().size(), 0);
	}
}
