package lk.ijse.gdse66.helloshoes.service.util;

import lk.ijse.gdse66.helloshoes.dto.CustomerDTO;
import lk.ijse.gdse66.helloshoes.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.stream.Collectors;


@Component
public class Tranformer {
    @Autowired
    private ModelMapper mapper;

    public enum ClassType {
        CUS_DTO,
        CUS_ENTITY,
        CUS_DTO_LIST,
        CUS_ENTITY_LIST,
        ITEM_DTO,
        ITEM_ENTITY,
        ITEM_DTO_LIST,
        ITEM_ENTITY_LIST,
        ORDER_DETAILS_ENTITY,
        ORDER_DETAILS_DTO,
        ORDER_ENTITY,
        ORDER_DTO,
        ORDER_ENTITY_LIST,
        ORDER_DTO_LIST,
        ORDER_DETAILS_DTO_LIST
    }

    public <R> R convert(Object from, ClassType to) {
        /*if (getType(to) instanceof OrderDetailsDTO) {
            return (R) toOrderDetailsDTO((OrderDetails) from);
        }
        if (getType(to) instanceof OrderDetails) {
            return (R) toOrderDetailsEntity((OrderDetailsDTO) from);
        }
        if (to.equals(ClassType.ORDER_ENTITY)) {
            return (R) toOrderEntity((OrderDTO) from);
        }
        if (to.equals(ClassType.ORDER_DTO)) {
            return (R) toOrderDTO((Order) from);
        }
        if (to.equals(ClassType.ORDER_DTO_LIST)){
            return (R) toOrderDTOList((List<Order>) from);
        }
        if (to.equals(ClassType.ORDER_DETAILS_DTO_LIST)){
            return (R) toOrderDetailDTOList((List<OrderDetails>) from);
        }*/
        return (R) mapper.map(from, getType(to));

    }
    /*public List<OrderDTO> toOrderDTOList(List<Order> orders) {
        return orders.stream()
                .map(this::toOrderDTO)
                .collect(Collectors.toList());
    }
    public List<OrderDetailsDTO> toOrderDetailDTOList(List<OrderDetails> orders) {
        return orders.stream()
                .map(this::toOrderDetailsDTO)
                .collect(Collectors.toList());
    }
    public OrderDTO toOrderDTO(Order order) {
        OrderDTO orderDTO = mapper.typeMap(Order.class, OrderDTO.class)
                .addMapping(src -> src.getOid(), OrderDTO::setOid)
                .addMapping(src -> src.getCustomer().getId(), OrderDTO::setCusID)
                .addMapping(src -> src.getDate(), OrderDTO::setDate)
                .addMappings(mapper -> mapper.skip(OrderDTO::setOrderDetails))
                .map(order);
        List<OrderDetailsDTO> orderDetailsDTOList = order.getOrderDetails().stream()
                .map(this::toOrderDetailsDTO)
                .collect(Collectors.toList());
        orderDTO.setOrderDetails(orderDetailsDTOList);

        return orderDTO;
    }
    public Order toOrderEntity(OrderDTO orderDTO) {
        Order order = mapper.typeMap(OrderDTO.class, Order.class)
                .addMapping(src -> src.getOid(), Order::setOid)
                .addMapping(src -> src.getDate(), Order::setDate)
                .addMappings(mapper ->
                    mapper.map(OrderDTO::getCusID, (dest, value) -> dest.getCustomer().setId((String) value))
                 )
                .addMappings(mapper -> mapper.skip(Order::setOrderDetails))
                .map(orderDTO);
        List<OrderDetails> orderDetails = orderDTO.getOrderDetails().stream()
                .map(this::toOrderDetailsEntity)
                .collect(Collectors.toList());
        order.setOrderDetails(orderDetails);

        return order;
    }
    public OrderDetailsDTO toOrderDetailsDTO(OrderDetails orderDetail) {
        return mapper.typeMap(OrderDetails.class, OrderDetailsDTO.class)
                .addMapping(src -> src.getOrderDetailPK().getOid(), OrderDetailsDTO::setOid)
                .addMapping(src -> src.getItem().getItmCode(), OrderDetailsDTO::setItmCode)
                .addMapping(src -> src.getItem().getItmPrice(), OrderDetailsDTO::setItmPrice)
                .addMapping(src -> src.getItmQTY(), OrderDetailsDTO::setItmQTY)
                .map(orderDetail);
    }

    public OrderDetails toOrderDetailsEntity(OrderDetailsDTO detailsDTO) {
        return mapper.typeMap(OrderDetailsDTO.class, OrderDetails.class)
                .addMappings(mapper -> {
                    mapper.map(OrderDetailsDTO::getItmCode, (dest, value) -> dest.getOrderDetailPK().setItmCode((String)value));
                    mapper.map(OrderDetailsDTO::getOid, (dest, value) -> dest.getOrderDetailPK().setOid((String)value));
                    mapper.map(OrderDetailsDTO::getOid, (dest, value) -> dest.getOrder().setOid((String) value));
                    mapper.map(OrderDetailsDTO::getItmCode, (dest, value) -> dest.getItem().setItmCode((String) value));
                })
                .addMapping(src -> src.getItmQTY(), OrderDetails::setItmQTY)
                .map(detailsDTO);
    }
*/
    private Type getType(ClassType type) {
        switch (type) {
            case CUS_DTO:
                return CustomerDTO.class;
            case CUS_ENTITY:
                return Customer.class;
            /*case CUS_DTO_LIST:
                return new TypeToken<ArrayList<CustomerDTO>>() {}.getType();
            case CUS_ENTITY_LIST:
                return new TypeToken<ArrayList<Customer>>() {}.getType();
            case ITEM_DTO:
                return ItemDTO.class;
            case ITEM_ENTITY:
                return Item.class;
            case ITEM_DTO_LIST:
                return new TypeToken<ArrayList<ItemDTO>>() {}.getType();
            case ITEM_ENTITY_LIST:
                return new TypeToken<ArrayList<Item>>() {}.getType();
            case ORDER_DETAILS_DTO:
                return OrderDetailsDTO.class;
            case ORDER_DETAILS_ENTITY:
                return OrderDetails.class;
            case ORDER_ENTITY:
                return Order.class;
            case ORDER_DTO:
                return OrderDTO.class;
            case ORDER_ENTITY_LIST:
                return new TypeToken<ArrayList<Order>>() {}.getType();
            case ORDER_DTO_LIST:
                return new TypeToken<ArrayList<OrderDTO>>() {}.getType();
            case ORDER_DETAILS_DTO_LIST:
                return new TypeToken<ArrayList<OrderDetailsDTO>>() {}.getType();*/
            default:
                throw new IllegalArgumentException("Unsupported ClassType: " + type);
        }
    }
}
